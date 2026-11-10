#include <unity.h>
#include <math.h>
#include "coldchain_logic.h"

void setUp(void) {}
void tearDown(void) {}

void test_valid_reading(void) {
    TEST_ASSERT_TRUE(sensor_reading_valid(-18.0f, 60.0f));
}
void test_nan_temp_rejected(void) {
    TEST_ASSERT_FALSE(sensor_reading_valid(NAN, 60.0f));
}
void test_variation(void) {
    TEST_ASSERT_FLOAT_WITHIN(0.001f, 3.0f, temp_variation(-15.0f, -18.0f));
}
void test_normalize(void) {
    TEST_ASSERT_FLOAT_WITHIN(0.001f, 1.0f, normalize(12.0f, 10.0f, 2.0f));
}
void test_anomaly_threshold(void) {
    TEST_ASSERT_TRUE(ml_is_anomaly(0.51f));
    TEST_ASSERT_FALSE(ml_is_anomaly(0.5f));
}
void test_topic(void) {
    char buf[50];
    build_topic(buf, sizeof(buf), "CAM-01", "ESP32-01");
    TEST_ASSERT_EQUAL_STRING("coldchain/CAM-01/ESP32-01/data", buf);
}

int main(void) {
    UNITY_BEGIN();
    RUN_TEST(test_valid_reading);
    RUN_TEST(test_nan_temp_rejected);
    RUN_TEST(test_variation);
    RUN_TEST(test_normalize);
    RUN_TEST(test_anomaly_threshold);
    RUN_TEST(test_topic);
    return UNITY_END();
}


