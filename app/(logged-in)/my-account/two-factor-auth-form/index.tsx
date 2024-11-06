'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { get2faSecret } from './action';
import { useToast } from '@/hooks/use-toast';

type Props = {
  twoFactorActivated: any;
};

export default function TwoFactorAuthForm({ twoFactorActivated }: Props) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState('');
  const { toast } = useToast;

  const handleEnableclk = async () => {
    const Response = await get2faSecret();

    if (Response.error) {
      toast({
        variant: 'destructive',
        title: Response.message,
      });
    }

    setStep(2);
  };

  const handleSubmitotp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      {!isActivated && (
        <div>
          {step === 1 && (
            <Button onClick={handleEnableclk}>
              enbable tow-factor authenction
            </Button>
          )}
          {step === 2 && (
            <div>
              <p>
                scan the qr code below in the google autheninclator app to
                active tow-factor
              </p>
            </div>
          )}
          {step === 3 && (
            <form onSubmit={handleSubmitotp}>
              <p>
                scan the qr code below in the google autheninclator app to
                active tow-factor
              </p>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button>enbable tow-factor authenction</Button>
              <Button onClick={handleEnableclk}>
                enbable tow-factor authenction
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
