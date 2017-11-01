import Vue from 'vue'
import Vuex from 'vuex'

export const UPDATE_COMMENTLIST = 'UPDATE_COMMENTLIST'
export const UPDATE_LISTMENU = 'UPDATE_LISTMENU'
export const UPDATE_FOODNUMBER = 'UPDATE_FOODNUMBER'
export const UPDATE_CARTID = 'UPDATE_CARTID'
export const UPDATE_CARTMENUID = 'UPDATE_CARTMENUID'
export const UPDATE_PICKUPINFO = 'UPDATE_PICKUPINFO'
export const UPDATE_TAKEOUTINFO = 'UPDATE_TAKEOUTINFO'
export const UPDATE_ASD = 'UPDATE_ASD'

Vue.use(Vuex)

const state = {
    openId: 'oN1klv2vnB1J-ZB2sREHuUtFUDYw',
    username: '测试名称',
    avatar: 'xxx.jpg',
    cartId: null,
    cartMenuId: [],
    commentList: [],
    asd: 'default',
    address: {},
    takeOutInfo: {
        personName: '',
        sex: '',
        phoneNumber: '',
        address: '',
        addressId: null,
        payway: '在线支付',
        takeTime: '尽快取餐',
        note: ''
    },
    pickUpInfo: {
        personName: '',
        sex: '',
        phoneNumber: '',
        address: '',
        payway: '在线支付',
        takeTime: '尽快取餐',
        note: ''
    }
}

const getters = {
    cartList (state) {
        const list = state.listMenu.reduce((acc, cur) => {
            return acc.concat(cur.foodList)
        }, [])
        return list.filter(item => item.number > 0)
    },
    totalDiscountPrice (state, getters) {
        let count = 0
        getters.cartList.forEach(item => {
            count += item.discountPrice * item.number
        })
        return parseFloat(count.toFixed(2))
    },
    totalMenutPrice (state, getters) {
        let count = 0
        getters.cartList.forEach(item => {
            count += item.menuPrice * item.number
        })
        return parseFloat(count.toFixed(2))
    }
}

const mutations = {
    [UPDATE_COMMENTLIST] (state, list) {
        state.commentList = list
    },
    [UPDATE_LISTMENU] (state, list) {
        state.listMenu = list
        storage.setItem('listMenu', list)
    },
    [UPDATE_FOODNUMBER] (state, data) {
        let foodList = state.listMenu.reduce((acc, cur) => {
            return acc.concat(cur.foodList)
        }, [])
        console.log('foodList', foodList)
        for (let i = 0; i < foodList.length; i++) {
            if (foodList[i].menuId === data.menuId) {
                foodList[i].number = data.number
                foodList[i].cartMenuId = data.cartMenuId
            }
        }
        storage.setItem('listMenu', state.listMenu)
    },
    [UPDATE_CARTID] (state, id) {
        state.cartId = id
    },
    [UPDATE_CARTMENUID] (state, id) {
        state.cartMenuId = id
    },
    [UPDATE_PICKUPINFO] (state, info) {
        state.pickUpInfo = info
    },
    [UPDATE_TAKEOUTINFO] (state, info) {
        state.takeOutInfo = info
    },
    [UPDATE_ASD]  (state, asd) {
        console.log('更新', state, asd)
        state.asd = asd
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    strict: false
})
