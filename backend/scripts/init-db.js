const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres', // Подключаемся к стандартной базе
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function initDatabase() {
  try {
    console.log('🔄 Создание базы данных...');
    
    // Проверяем, существует ли база
    const checkDb = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'travel_agency_db'"
    );
    
    if (checkDb.rows.length === 0) {
      // Создаем базу данных
      await pool.query('CREATE DATABASE travel_agency_db');
      console.log('✅ База данных travel_agency_db создана');
    } else {
      console.log('ℹ️ База данных travel_agency_db уже существует');
    }
    
    // Закрываем соединение с postgres базой
    await pool.end();
    
    // Подключаемся к новой базе
    const dbPool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: 'travel_agency_db',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    console.log('🔄 Создание таблиц...');
    
    // Читаем SQL файл со структурой
    const sqlSchema = fs.readFileSync(
      path.join(__dirname, '../../sql/deepseek_sql_20260209_7cb890.sql'),
      'utf8'
    );
    
    // Выполняем SQL скрипт
    await dbPool.query(sqlSchema);
    console.log('✅ Таблицы созданы');
    
    console.log('🔄 Загрузка тестовых данных...');
    
    // Читаем SQL файл с данными
    const sqlData = fs.readFileSync(
      path.join(__dirname, '../../sql/deepseek_sql_20260209_8b6c8b.sql'),
      'utf8'
    );
    
    // Выполняем SQL скрипт с данными
    await dbPool.query(sqlData);
    console.log('✅ Тестовые данные загружены');
    
    await dbPool.end();
    console.log('🎉 База данных успешно инициализирована!');
    
  } catch (error) {
    console.error('❌ Ошибка при инициализации базы данных:', error);
  }
}

initDatabase();