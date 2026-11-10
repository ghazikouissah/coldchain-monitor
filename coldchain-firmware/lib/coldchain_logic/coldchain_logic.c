#include "coldchain_logic.h"
#include <math.h>
#include <stdio.h>

bool sensor_reading_valid(float temp, float hum) {
    return !isnan(temp) && !isnan(hum);
}

float temp_variation(float temp, float prev_temp) {
    return temp - prev_temp;
}

float normalize(float value, float mean, float std) {
    return (value - mean) / std;
}

bool ml_is_anomaly(float score) {
    return score > 0.5f;
}

int build_topic(char *buf, size_t len, const char *camion, const char *capteur) {
    return snprintf(buf, len, "coldchain/%s/%s/data", camion, capteur);
}
