// import { create, useStore } from 'zustand'

// type IAuthStore = {
// 	name: string
// 	role: string
// 	token: string
// }

// type IAuthStoreActions = {
// 	setToken: (token: string) => void
// 	setName: (name: string) => void
// 	setRole: (role: string) => void
// }

// export const useAuthStore = create<IAuthStore & IAuthStoreActions>( () => ({
// 	name: '',
// 	role: '',
// 	token: '',

// 	setName: (name: string) => {
// 		useAuthStore.setState({ name })
// 	},
// 	setRole: (role: string) => {
// 		useAuthStore.setState({ role })
// 	},
// 	setToken: (token: string) => {
// 		useAuthStore.setState({ token })
// 	}
// }));
