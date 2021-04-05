<template>
  <div>
    <section id="js-grid-list" class="grid-list" v-cloak>
      <div class="tool-bar">
        <div class="search-bar-center">
          <input class="search-bar" v-model="searchByName" type="text" />
          <button class="btn btn-secondary" @click="search">search</button>
          <label class="item-label">Item Per Page</label>
          <select class="limit-box" v-model="settings.limit" @change="loadMore">
            <option value="16">16</option>
            <option value="24">24</option>
            <option value="30">30</option>
          </select>
        </div>
        <a
          class="list-icon"
          v-on:click="layout = 'list'"
          v-bind:class="{ active: layout == 'list' }"
          title="List"
        ></a>
        <a
          class="grid-icon"
          v-on:click="layout = 'grid'"
          v-bind:class="{ active: layout == 'grid' }"
          title="Grid"
        ></a>
      </div>

      <ul :class="layout">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="limit"
        >
          <!-- eslint-disable-next-line -->
          <li v-for="show in getShows">
            <template v-if="layout == 'list'">
              <a v-bind:href="show.link" target="_blank">
                <img :src="show.image" />
                <p>{{ show.name }}</p>
              </a>
            </template>

            <template v-if="layout == 'grid'">
              <a
                v-bind:href="show.link"
                v-bind:style="{ backgroundImage: 'url(' + show.image + ')' }"
                target="_blank"
              ></a>
              <p>{{ show.name }}</p>
            </template>
          </li>
        </ul>
      </ul>
    </section>
  </div>
</template>
<script>
import { FETCH_SHOWS, FETCH_SHOWS_BY_NAME } from '../store/actionTypes'

export default {
  name: 'Post',
  computed: {
    getShows() {
      return this.$store.state.post_store.shows
    }
  },
  watch: {
    searchByName: function(oldValue) {
      if (oldValue === '') {
        this.resetSetting()
        this.$store.dispatch(FETCH_SHOWS, this.settings)
      }
    }
  },
  methods: {
    resetSetting() {
      this.searchByName = null
      this.settings.limit = 16
      this.settings.page = 1
    },
    search: function() {
      this.settings.limit = 16
      this.settings.page = 0
      this.settings.q = this.searchByName
      if (this.searchByName !== null) {
        this.$store.dispatch(FETCH_SHOWS_BY_NAME, this.settings)
      }
    },
    loadMore: function() {
      this.busy = true
      if (this.searchByName === null) {
        this.$store.dispatch(FETCH_SHOWS, this.settings)
      } else {
        this.$store.dispatch(FETCH_SHOWS_BY_NAME, this.settings)
      }
      this.settings.page++
      this.busy = false
    }
  },
  data() {
    return {
      settings: {
        limit: 16,
        page: 1,
        q: null
      },
      busy: false,
      searchByName: null,
      layout: 'grid'
    }
  }
}
</script>
<style>
[v-cloak] {
  /* Hide un-compiled mustache bindings until the Vue instance is ready */
  display: none;
}

* {
  box-sizing: border-box;
}

a,
a:visited,
a:hover {
  color: #389dc1;
  display: block;
  outline: none;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

.grid-list {
  background-color: #fff;
  color: #5e5b64;
  font: 17px/1.3 'Open Sans', sans-serif;
  margin: 0 auto;
  max-width: 100%;
  /*padding: 30px;*/
  text-align: center;
}

/* The tool bar */
.tool-bar {
  background-color: #ed1c24;
  background-image: url('data:image/jpeg;base64,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');
  background-position: top left;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 1px 1px #ccc;
  line-height: 1;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  text-align: right;
  width: 100%;
}

.tool-bar a {
  background: rgba(255, 255, 255, 0.5) center center no-repeat;
  border: 1px solid #e4e4e4;
  border-right: 1px solid #908f8f;
  border-bottom: 1px solid #908f8f;
  cursor: pointer;
  display: inline-block;
  height: 32px;
  margin-right: 5px;
  text-decoration: none;
  width: 32px;
}

.tool-bar a:hover {
  border: 1px solid #e4e4e4;
}

.tool-bar a.active {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #908d8d;
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
}

.tool-bar a.active:hover {
  cursor: default;
}

.tool-bar a.list-icon {
  z-index: 1;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzNkFCQ0ZBMTBCRTExRTM5NDk4RDFEM0E5RkQ1NEZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzNkFCQ0ZCMTBCRTExRTM5NDk4RDFEM0E5RkQ1NEZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjM2QUJDRjgxMEJFMTFFMzk0OThEMUQzQTlGRDU0RkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjM2QUJDRjkxMEJFMTFFMzk0OThEMUQzQTlGRDU0RkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7h1bLqAAAAWUlEQVR42mL8////BwYGBn4GCACxBRlIAIxAA/4jaXoPEkMyjJ+A/g9MDJQBRhYg8RFqMwg8RJIUINYLFDmBUi+ADQAF1n8ofk9yIAy6WPg4GgtDMRYAAgwAdLYwLAoIwPgAAAAASUVORK5CYII=');
}

.tool-bar a.grid-icon {
  z-index: 1;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEQkMyQzE0MTBCRjExRTNBMDlGRTYyOTlBNDdCN0I4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBEQkMyQzE1MTBCRjExRTNBMDlGRTYyOTlBNDdCN0I4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MERCQzJDMTIxMEJGMTFFM0EwOUZFNjI5OUE0N0I3QjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MERCQzJDMTMxMEJGMTFFM0EwOUZFNjI5OUE0N0I3QjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MjPshAAAAXklEQVR42mL4////h/8I8B6IGaCYKHFGEMnAwCDIAAHvgZgRyiZKnImBQsACxB+hNoDAQyQ5osQZIT4gH1DsBZABH6AB8x/JaQzEig++WPiII7Rxio/GwmCIBYAAAwAwVIzMp1R0aQAAAABJRU5ErkJggg==');
}

/* Grid layout */
.grid {
  background-color: #ddedfb;
  list-style: none;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  width: 100%;
}

.grid li {
  display: inline-block;
  position: relative;
  width: 25%;
  /*width: 50%;*/
}

.grid li:after {
  content: '';
  display: block;
  padding-bottom: 52%;
}

.grid li a {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid #fff;
  height: 100%;
  position: absolute;
  width: 100%;
}

.grid li a:hover {
  border: 2px solid #000;
  box-shadow: inset 0 0 90px -10px rgba(0, 0, 0, 1);
  -moz-box-shadow: inset 0 0 90px -10px rgba(0, 0, 0, 1);
  -webkit-box-shadow: inset 0 0 90px -10px rgba(0, 0, 0, 1);
}
.grid li p {
  z-index: 1;
  position: relative;
  background: rgb(0 0 0 / 50%);
  color: #fff;
  top: 0;
  padding: 10px;
  margin: 0 2px 0 2px;
  text-align: center;
}

/* List layout */
.list {
  background-color: #ddedfb;
  list-style: none;
  margin: 0 auto;
  padding: 0;
  text-align: left;
  width: 100%;
}

.list li {
  border-bottom: 1px solid #fff;
  overflow: hidden;
  padding: 20px;
  transition: background 0.2s linear;
}

.list li:hover {
  background-color: #fff;
}

.list li a {
  display: table;
  width: 100%;
}

.list li img {
  border: none;
  display: table-cell;
  height: 120px;
  vertical-align: middle;
  width: 120px;
}

.list li:hover p {
  color: #0096d4;
}

.list li p {
  color: #000;
  display: table-cell;
  font-weight: 700;
  padding: 0 0 0 15px;
  vertical-align: middle;
  width: 100%;
}
.search-bar-center {
  text-align: center;
  position: static;
  margin-top: 33px;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 13%;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.search-bar {
  width: 20%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-right: 10px;
}
.limit-box {
  width: 8%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  left: 10px;
}
.item-label {
  margin: 0px 16px;
  color: white;
  font-size: initial;
  font-weight: bold;
}
</style>
