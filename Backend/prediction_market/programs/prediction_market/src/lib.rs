use anchor_lang::prelude::*;

declare_id!("8PfZ3vQKjFWK1eZtB5nttdYQjJo5DZLE7JAbkn2CdQBR");

#[program]
pub mod prediction_market {
    use super::*;

    pub fn create_market(
        ctx: Context<CreateMarket>,
        description: String,
        deadline: i64,
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;
        market.creator = *ctx.accounts.creator.key;
        market.description = description;
        market.deadline = deadline;
        market.is_resolved = false;
        market.result = None;
        Ok(())
    }

    pub fn place_bet(
        ctx: Context<PlaceBet>,
        outcome: bool,
        amount: u64,
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;

        require!(Clock::get()?.unix_timestamp < market.deadline, CustomError::MarketClosed);

        if outcome {
            market.yes_pool += amount;
        } else {
            market.no_pool += amount;
        }

        **ctx.accounts.bettor.to_account_info().try_borrow_mut_lamports()? -= amount;
        **market.to_account_info().try_borrow_mut_lamports()? += amount;
        Ok(())
    }

    pub fn resolve_market(ctx: Context<ResolveMarket>, result: bool) -> Result<()> {
        let market = &mut ctx.accounts.market;

        require!(
            Clock::get()?.unix_timestamp >= market.deadline,
            CustomError::MarketStillActive
        );

        market.is_resolved = true;
        market.result = Some(result);
        Ok(())
    }

    pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
        let market = &mut ctx.accounts.market;
        let bettor = &mut ctx.accounts.bettor;

        require!(market.is_resolved, CustomError::MarketNotResolved);

        let reward = if market.result.unwrap() {
            bettor.yes_bet * market.total_lamports() / market.yes_pool
        } else {
            bettor.no_bet * market.total_lamports() / market.no_pool
        };

        **market.to_account_info().try_borrow_mut_lamports()? -= reward;
        **bettor.to_account_info().try_borrow_mut_lamports()? += reward;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMarket<'info> {
    #[account(init, payer = creator, space = 8 + 200)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub bettor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResolveMarket<'info> {
    #[account(mut, has_one = creator)]
    pub market: Account<'info, Market>,
    pub creator: Signer<'info>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub bettor: Signer<'info>,
}

#[account]
pub struct Market {
    pub creator: Pubkey,
    pub description: String,
    pub deadline: i64,
    pub yes_pool: u64,
    pub no_pool: u64,
    pub is_resolved: bool,
    pub result: Option<bool>,
}

impl Market {
    pub fn total_lamports(&self) -> u64 {
        self.yes_pool + self.no_pool
    }
}

#[error_code]
pub enum CustomError {
    #[msg("The market is already closed.")]
    MarketClosed,
    #[msg("The market is still active.")]
    MarketStillActive,
    #[msg("The market is not resolved yet.")]
    MarketNotResolved,
}
pub struct Initialize {}
