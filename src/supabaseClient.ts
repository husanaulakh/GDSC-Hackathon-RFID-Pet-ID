import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fewdvaimgzbfyktioquz.supabase.co";
// Public Anon key, safe on browser if backend is RLS-protected
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZld2R2YWltZ3piZnlrdGlvcXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NjA4NTAsImV4cCI6MjA1NjQzNjg1MH0.FVcfYH5OoUa57ALehFd8plZsdWRi-XKTyWYwQCt8n5o";
const supabase = createClient(
	supabaseUrl,
	supabaseKey
);

async function GetAccessToken(): Promise<string|undefined> {
	const { data } = await supabase.auth.getSession();
	const accessToken = data?.session?.access_token;

	return accessToken;
}

export default supabase
export { GetAccessToken }