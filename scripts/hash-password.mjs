// Generate a bcrypt hash for your admin password.
// Usage:  node scripts/hash-password.mjs "your-strong-password"
import bcrypt from 'bcryptjs'

const pw = process.argv[2]
if (!pw) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"')
  process.exit(1)
}
const hash = await bcrypt.hash(pw, 12)
console.log('\nSet this as ADMIN_PASSWORD_HASH in your Vercel env:\n')
console.log(hash + '\n')
