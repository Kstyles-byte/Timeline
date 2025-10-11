# Vercel Deployment Setup

## Environment Variables

You need to add these environment variables to your Vercel project:

### Required Variables:
1. `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### How to Add Environment Variables to Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your Timeline project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL (from your local `.env.local` file)
   - Environments: Production, Preview, Development
   
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
   - Value: Your Supabase anon key (from your local `.env.local` file)
   - Environments: Production, Preview, Development

5. After adding the variables, trigger a new deployment by pushing to your main branch

### Finding Your Supabase Values:
You can find these values in your Supabase project dashboard:
- Go to https://supabase.com/dashboard
- Select your project
- Go to **Settings** → **API**
- Copy the URL and anon key

Or check your local `.env.local` file for the current values.

### After Setup:
Once the environment variables are added, your next deployment should work successfully!