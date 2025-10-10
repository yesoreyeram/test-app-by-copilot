package tempconv

import (
	"math"
	"testing"
)

func TestCelsiusToFahrenheit(t *testing.T) {
	tests := []struct {
		celsius  float64
		expected float64
	}{
		{0, 32},
		{100, 212},
		{-40, -40},
	}

	for _, tt := range tests {
		result := CelsiusToFahrenheit(tt.celsius)
		if math.Abs(result-tt.expected) > 0.01 {
			t.Errorf("CelsiusToFahrenheit(%f) = %f; want %f", tt.celsius, result, tt.expected)
		}
	}
}

func TestFahrenheitToCelsius(t *testing.T) {
	tests := []struct {
		fahrenheit float64
		expected   float64
	}{
		{32, 0},
		{212, 100},
		{-40, -40},
	}

	for _, tt := range tests {
		result := FahrenheitToCelsius(tt.fahrenheit)
		if math.Abs(result-tt.expected) > 0.01 {
			t.Errorf("FahrenheitToCelsius(%f) = %f; want %f", tt.fahrenheit, result, tt.expected)
		}
	}
}
