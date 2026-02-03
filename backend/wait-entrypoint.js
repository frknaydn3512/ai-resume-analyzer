const { exec } = require('child_process');

const checkDb = () => {
  console.log('Waiting for database connection...');
  // Attempt to push schema. If it fails, DB is likely not ready.
  exec('npx prisma db push', (error, stdout, stderr) => {
    if (error) {
      console.log('Database connection failed. Retrying in 3 seconds...');
      console.error(stderr); // Log stderr to see why it failed
      setTimeout(checkDb, 3000);
    } else {
      console.log('Database connected and schema synchronized!');
      console.log(stdout); 
      process.exit(0); // Exit successfully so the next command runs
    }
  });
};

checkDb();
