@component('mail::message')
# Feedback Reply

Hi {{$name}},

@component('mail::panel')
{{$message}}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
