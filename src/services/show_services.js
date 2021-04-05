import axiosConfig from '../axiosConfig'

export default {
  getShows(settings) {
    const url = 'shows'
    return axiosConfig.get(url, { params: settings }).catch(error => {
      throw new Error(error)
    })
  },

  getShowsByName(settings) {
    const url = 'show/search'
    return axiosConfig.get(url, { params: settings }).catch(error => {
      throw new Error(error)
    })
  }
}
