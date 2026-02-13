const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/sitemap.xml', async (req, res) => {
  try {
    // Получаем все туры из базы
    const toursQuery = 'SELECT id, slug, updated_at FROM tours WHERE is_active = true';
    const toursResult = await pool.query(toursQuery);
    
    // Получаем все направления
    const directionsQuery = 'SELECT slug FROM directions';
    const directionsResult = await pool.query(directionsQuery);
    
    const baseUrl = 'https://tur4sides.ru';
    const today = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Главная страница -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Статические страницы -->
  <url>
    <loc>${baseUrl}/tours-russia</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Динамические страницы направлений -->`;
    
    // Добавляем направления
    directionsResult.rows.forEach(dir => {
      sitemap += `
  
  <url>
    <loc>${baseUrl}/tours-${dir.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
    
    // Добавляем туры
    toursResult.rows.forEach(tour => {
      const lastmod = tour.updated_at ? tour.updated_at.toISOString().split('T')[0] : today;
      sitemap += `
  
  <url>
    <loc>${baseUrl}/tour/${tour.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
    
    sitemap += `
  
</urlset>`;
    
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;