import db from '@/db/drizzle';
import { passwordResetTokens } from '@/db/passwordResetTokensSchema';
import { eq } from 'drizzle-orm';

export default async function updatePassword({
  searchPharams,
}: {
  searchPharams?: {
    token?: string;
  };
}) {
  let tokenIsValid = false;

  const { token } = searchPharams;

  if (token) {
    const { passwordResetTokens } = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    const now = Date.now();

    if (
      !!passwordResetTokens?.toekenExpiry &&
      now < passwordResetTokens.toekenExpiry.getTime()
    ) {
      tokenIsValid = true;
    }
  }
}
