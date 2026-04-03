# MySQL Root Password Reset - Manual Steps

## ⚠️ Important: Run Command Prompt as Administrator

1. **Right-click on Command Prompt** and select **"Run as administrator"**

---

## Step 1: Stop MySQL Service

```cmd
net stop MySQL80
```

Wait for it to say "The MySQL80 service has been stopped successfully"

---

## Step 2: Start MySQL in Safe Mode

```cmd
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --skip-grant-tables
```

This will keep running - **DO NOT CLOSE THIS WINDOW**. Leave it open.

---

## Step 3: Open a NEW Administrator Command Prompt

1. Open another Command Prompt window as Administrator
2. Run these MySQL commands:

```cmd
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root
```

You should see the MySQL prompt: `mysql>`

3. Run these commands one by one:

```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '';
EXIT;
```

---

## Step 4: Stop the mysqld process

1. Open **Task Manager** (Press `Ctrl + Shift + Esc`)
2. Find `mysqld.exe` in the list
3. Right-click and **"End task"**

---

## Step 5: Restart MySQL normally

In the Command Prompt, run:

```cmd
net start MySQL80
```

---

## Step 6: Verify the password reset worked

```cmd
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -e "SHOW DATABASES;"
```

If you see a list of databases, the password reset worked! ✓

---

## Then Run the Database Setup

Once the password is reset, run:

```cmd
cd c:\Users\princ\OneDrive\Desktop\Task-1\student-management-system\backend
setup-db.cmd
```

---

**Need help?** Check the error messages and let me know what happens.
