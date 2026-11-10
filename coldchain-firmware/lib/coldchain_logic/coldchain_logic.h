#pragma once
#include <stdbool.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

bool  sensor_reading_valid(float temp, float hum);
float temp_variation(float temp, float prev_temp);
float normalize(float value, float mean, float std);
bool  ml_is_anomaly(float score);
int   build_topic(char *buf, size_t len, const char *camion, const char *capteur);

#ifdef __cplusplus
}
#endif


