import PostService from '../../services/show_services'
import { FETCH_SHOWS, FETCH_SHOWS_BY_NAME } from '../actionTypes'

import { SET_SHOWS, SET_SHOWS_BY_NAME } from '../mutationTypes'

export const state = {
  shows: []
}

export const actions = {
  [FETCH_SHOWS]({ commit }, settings) {
    return PostService.getShows(settings)
      .then(response => {
        commit(SET_SHOWS, response)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  [FETCH_SHOWS_BY_NAME]({ commit }, settings) {
    return PostService.getShowsByName(settings)
      .then(response => {
        commit(SET_SHOWS_BY_NAME, response)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_SHOWS](currentState, response) {
    if (response.status == 201) {
      let currentPage = response.data.data.current_page
      let shows = response.data.data.data
      if (currentPage === 1) {
        currentState.shows = []
      }
      for (const index in shows) {
        currentState.shows.push(shows[index])
      }
    }
  },
  [SET_SHOWS_BY_NAME](currentState, response) {
    if (response.status == 201) {
      let currentPage = response.data.data.current_page
      let shows = response.data.data.data
      if (currentPage === 1) {
        currentState.shows = []
      }
      for (const index in shows) {
        currentState.shows.push(shows[index])
      }
    }
  }
}

export default {
  state,
  actions,
  mutations
}
