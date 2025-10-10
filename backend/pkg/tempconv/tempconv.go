package tempconv

// CelsiusToFahrenheit converts Celsius to Fahrenheit
func CelsiusToFahrenheit(c float64) float64 {
	return (c * 9 / 5) + 32
}

// FahrenheitToCelsius converts Fahrenheit to Celsius
func FahrenheitToCelsius(f float64) float64 {
	return (f - 32) * 5 / 9
}
