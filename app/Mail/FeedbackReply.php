<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FeedbackReply extends Mailable
{
    use Queueable, SerializesModels;

    public $name;

    public $message;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $message)
    {
        $this->name = $name;
        $this->message = $message;
    }

    public function build()
    {
        $subject = 'RE: Feedback Reply';

        return $this->markdown('emails.feeback_reply')
                    ->subject($subject);
    }

}
