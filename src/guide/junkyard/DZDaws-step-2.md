# Step 2 - Database
We do not provide specific instructions for setting up a database with AWS RDS, as the
needs will vary between deployments and there are many options for size, redundancy, backups, etc.

Whichever database you create, we recommend deploying production databases across multiple availability zones and ensuring you have adequate backups for your needs.

When you create the database, make sure you place it in the database security group provisioned during the environment set up above.
