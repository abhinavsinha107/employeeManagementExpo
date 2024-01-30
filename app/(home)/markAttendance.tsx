import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGetAllEmployeesQuery } from "../../services/api";

const markAttendance = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState([]);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };
  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };
  const formatDate = (date: any) => {
    return date.format("MMMM D, YYYY");
  };

  const { data, isLoading, isSuccess, error } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (isSuccess) {
      setEmployees(data);
    }
  }, [isSuccess]);

  return (
    <View>
      <Text>markAttendance</Text>
    </View>
  );
};

export default markAttendance;
