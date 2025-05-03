<?php

namespace App\Jobs;

use App\Mail\newTransaction as MailNewTransaction;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class newTransaction implements ShouldQueue
{
    use Queueable;
    /**
     * Create a new job instance.
     */
    public function __construct() {}

    /**
     * Execute the job.
     */
    public function handle(): void {}
}
