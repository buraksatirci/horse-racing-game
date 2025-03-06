/* global describe, test, expect */
import { generateRandomColor, horseNames } from '@/utils/helpers'

describe('Utils - Helpers', () => {
  test('generateRandomColor returns a valid hex color', () => {
    const color = generateRandomColor()
    
    expect(color.charAt(0)).toBe('#')
    expect(color.length).toBe(7)
    
    const hexPart = color.substring(1)
    expect(/^[0-9A-F]{6}$/i.test(hexPart)).toBe(true)
  })
  
  test('generateRandomColor returns different colors on consecutive calls', () => {
    const color1 = generateRandomColor()
    const color2 = generateRandomColor()
    const color3 = generateRandomColor()
    
    expect(
      color1 !== color2 || 
      color1 !== color3 || 
      color2 !== color3
    ).toBe(true)
  })
  
  test('horseNames is an array of strings', () => {
    expect(Array.isArray(horseNames)).toBe(true)
    expect(horseNames.length).toBe(20)
    
    horseNames.forEach(name => {
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })
  })
}) 