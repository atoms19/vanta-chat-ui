import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function GET() {
  return new Promise((resolve) => {
    exec('ollama list', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve(NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 }));
        return;
      }

      const lines = stdout.trim().split('\n');
      const models = lines.slice(1).map(line => {
        const parts = line.split(/\s+/);
        return parts[0];
      });

      resolve(NextResponse.json({ models }));
    });
  });
}
