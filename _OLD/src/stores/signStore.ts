import { trafficSigns } from '@/data/trafficSigns'
import { writable } from 'svelte/store'

export const signStore = writable(trafficSigns)
