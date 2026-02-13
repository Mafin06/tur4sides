<template>
  <div class="search-container">
    <div class="container">
      <div class="search-form">
        <div class="search-fields">
          <div class="search-field">
            <label>Охват территории</label>
            <select v-model="search.territory">
              <option value="russia">Россия</option>
              <option value="bashkortostan">Башкортостан</option>
              <option value="world">Весь мир</option>
            </select>
          </div>
          
          <div class="search-field">
            <label>Город отправления</label>
            <input 
              type="text" 
              v-model="search.departure" 
              placeholder="Уфа"
            >
          </div>
          
          <div class="search-field">
            <label>Город прибытия</label>
            <input 
              type="text" 
              v-model="search.arrival" 
              placeholder="Сочи"
            >
          </div>
          
          <div class="search-field">
            <label>Дата</label>
            <input 
              type="text" 
              v-model="search.date" 
              placeholder="12 окт - 15 окт"
            >
          </div>
        </div>
        
        <button class="search-btn" @click="handleSearch">
          Поиск
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      search: {
        territory: 'russia',
        departure: 'Уфа',
        arrival: 'Сочи',
        date: '12 окт - 15 окт'
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.search)
      // Здесь будет вызов API для поиска туров
    }
  }
}
</script>

<style scoped>
.search-container {
  background-color: #f8f9fa;
  padding: 2rem 0;
  margin-top: -2rem;
  position: relative;
  z-index: 10;
}

.search-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
}

.search-fields {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  flex: 1;
}

.search-field {
  display: flex;
  flex-direction: column;
}

.search-field label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.search-field select,
.search-field input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.search-btn:hover {
  background-color: #c0392b;
}
</style>