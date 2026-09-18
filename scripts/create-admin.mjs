import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceKey || !email || !password) {
  console.error("Missing Supabase or admin values. Copy .env.example to .env.local and fill every required field.");
  process.exit(1);
}

if (password.length < 12) {
  console.error("ADMIN_PASSWORD must contain at least 12 characters.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(targetEmail) {
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 100 });
    if (error) throw error;
    const found = data.users.find((user) => user.email?.toLowerCase() === targetEmail.toLowerCase());
    if (found) return found;
    if (data.users.length < 100) break;
  }
  return null;
}

try {
  let user = await findUserByEmail(email);
  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: "portfolio-admin" },
    });
    if (error) throw error;
    user = data.user;
  } else {
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
      user_metadata: { ...user.user_metadata, role: "portfolio-admin" },
    });
    if (error) throw error;
    user = data.user;
  }

  const { error: adminError } = await supabase
    .from("admins")
    .upsert({ user_id: user.id, email }, { onConflict: "user_id" });
  if (adminError) throw adminError;

  console.log("Admin account is ready:", email);
  console.log("You can now sign in at /admin/login.");
} catch (error) {
  console.error("Admin setup failed:", error.message || error);
  process.exit(1);
}
