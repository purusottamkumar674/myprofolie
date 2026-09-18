update public.site_settings
set email = 'purusottamsingh238@gmail.com'
where email = 'your-email@example.com';

update public.social_links
set url = 'mailto:purusottamsingh238@gmail.com'
where platform = 'Email'
  and url = 'mailto:your-email@example.com';
