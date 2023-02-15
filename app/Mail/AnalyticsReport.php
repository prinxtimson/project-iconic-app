<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AnalyticsReport extends Mailable
{
    use Queueable, SerializesModels;

    private $attachment;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($attachment)
    {
        $this->attachment = $attachment;
    }

    public function build()
    {
        $subject = 'Analytics Report';

        return $this->markdown('emails.reports')
                    ->subject($subject)->attachFromStorage($this->attachment);
    }
}
