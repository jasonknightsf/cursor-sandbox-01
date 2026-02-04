#!/usr/bin/env node

/**
 * Auto-push script for GitHub
 * Checks for changes and prompts to push
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function checkAndPush() {
  try {
    // Check for changes
    const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
    
    if (!status) {
      console.log('✅ No changes detected. Working directory is clean.');
      rl.close();
      return;
    }

    // Show changes
    console.log('\n📝 Changes detected:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    execSync('git status --short', { stdio: 'inherit' });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Ask for confirmation
    const answer = await question('❓ Do you want to commit and push these changes to GitHub? (y/n): ');
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      console.log('❌ Push cancelled.');
      rl.close();
      return;
    }

    // Get commit message
    const commitMsg = await question('\n💬 Enter commit message (or press Enter for default): ');
    const finalMsg = commitMsg.trim() || `Update: ${new Date().toLocaleString()}`;

    // Stage, commit, and push
    console.log('\n📦 Staging changes...');
    execSync('git add .', { stdio: 'inherit' });

    console.log('💾 Committing changes...');
    execSync(`git commit -m "${finalMsg}"`, { stdio: 'inherit' });

    console.log('🚀 Pushing to GitHub...');
    execSync('git push', { stdio: 'inherit' });

    console.log('\n✅ Successfully pushed to GitHub!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

checkAndPush();
