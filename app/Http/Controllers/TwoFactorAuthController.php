<?php

namespace App\Http\Controllers;

use App\Models\TwoFactor;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;

class TwoFactorAuthController extends Controller
{

    /**
     * validate sms
     *
     * @return response()
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required',
        ]);

        $exists = TwoFactor::where('user_id', auth()->user()->id)
                ->where('code', $validated['code'])
                ->exists();
        
        if(!$exists){
            return response('Invalid OTP, please resend', 401);
        }
  
        $exists = TwoFactor::where('user_id', auth()->user()->id)
                ->where('code', $validated['code'])
                ->where('updated_at', '>=', now()->subMinutes(10))
                ->exists();
  
        if ($exists) {
            $request->session()->put('user_2fa', auth()->user()->id);
            
            return redirect(RouteServiceProvider::HOME);
        }
  
        return response('OTP timed out, please resend ', 401);
    }
    /**
     * resend otp code
     *
     * @return response()
     */
    public function resend()
    {
        auth()->user()->generate_code();
  
        return response('Please check your email for your verification code');
    }
}
