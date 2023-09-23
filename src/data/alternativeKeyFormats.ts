// Manual test case: http://localhost:5173/?signs=DE:274-30 will "redirect" to http://localhost:5173/?signs=DE:274[30]
export const alternativeKeyFormats = new Map([
	['DE:274-5', 'DE:274[5]'],
	['DE:274-10', 'DE:274[10]'],
	['DE:274-20', 'DE:274[20]'],
	['DE:274-30', 'DE:274[30]'],
	['DE:274-40', 'DE:274[40]'],
	['DE:274-50', 'DE:274[50]'],
	['DE:274-60', 'DE:274[60]'],
	['DE:274-70', 'DE:274[70]'],
	['DE:274-80', 'DE:274[80]'],
	['DE:274-90', 'DE:274[90]'],
	['DE:274-100', 'DE:274[100]'],
	['DE:274-110', 'DE:274[110]'],
	['DE:274-120', 'DE:274[120]'],
	['DE:274-130', 'DE:274[130]']
])
