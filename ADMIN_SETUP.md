# Admin Setup Instructions

## Making Your Account an Admin

After signing up for the first time, you need to make your account an admin to access edit mode.

### Option 1: Using Supabase Dashboard
1. Go to your Supabase dashboard: https://app.supabase.com
2. Navigate to your project
3. Go to "Table Editor" → "profiles"
4. Find your user record and click edit
5. Change `is_admin` from `false` to `true`
6. Save the changes

### Option 2: Using SQL Query
1. Go to your Supabase dashboard
2. Navigate to "SQL Editor"
3. Run this query (replace YOUR_EMAIL with your actual email):

```sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'YOUR_EMAIL@example.com';
```

## Testing Admin Features

Once you've made your account an admin:

1. Refresh the Timeline app
2. You should see a user menu in the top-right corner with a yellow dot indicating admin status
3. Click the user menu and select "Enter Edit Mode"
4. You can now:
   - Edit level names and descriptions
   - Modify non-negotiables for each level
   - Add or remove non-negotiables

## Database Tables Created

The app automatically created these tables in your Supabase database:

- **profiles**: User accounts and admin status
- **levels**: Level definitions (Foundation, Building, Advanced, Master)
- **non_negotiables**: Requirements for each level
- **timeline_data**: User progress and statistics
- **failure_logs**: History of failed attempts with reasons

## Security Notes

- Only admin users can edit levels and non-negotiables
- Regular users can only modify their own timeline data
- Row Level Security (RLS) is enabled on all tables
- User data is automatically isolated per user account