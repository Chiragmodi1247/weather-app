import { shallowMount } from '@vue/test-utils'
import App from '../../src/App'


describe('App.vue', () => {
  const wrapper = shallowMount(App)
  it('Basic HTML is loaded', () => {
    console.info(wrapper.html())
    expect(wrapper.html()).toContain('<div class="search-box"><input type="text" placeholder="Search..." class="search-bar"></div>')
  })
  it('By default weather wrap div should not be rendered' , () => {
    expect(wrapper.find('.weather-wrap').exists()).toBe(false)
  })
  it('Text input is working' , () => {
    const textInput = wrapper.find('input[class="search-bar"]')
    textInput.setValue('London')
    expect(wrapper.vm.query).toBe('London')
  })
  it('should show proper data after fetching', async () => {
    await wrapper.setData({
      weather: {
        coord: {
          lon: -0.13,
          lat: 51.51
        },
        weather: [
          {
            id: 300,
            main: "Drizzle",
            description: "light intensity drizzle",
            icon: "09d"
          }
        ],
        base: "stations",
        main: {
          temp: 280.32,
          pressure: 1012,
          humidity: 81,
          temp_min: 279.15,
          temp_max: 281.15
        },
        visibility: 10000,
        wind: {
          speed: 4.1,
          deg: 80
        },
        clouds: {
          all: 90
        },
        dt: 1485789600,
        sys: {
          type: 1,
          id: 5091,
          message: 0.0103,
          country: "GB",
          sunrise: 1485762037,
          sunset: 1485794875
        },
        id: 2643743,
        name: "London",
        cod: 200
      }
    })
    const location = wrapper.find('div[class="location"]')
    expect(location.text()).toContain('London')
  });
})
