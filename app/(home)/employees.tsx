import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useGetAllEmployeesQuery } from "../../services/api";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [input, setInput] = useState<string>("");

    const router = useRouter();

  const { data, isLoading, isSuccess, error } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (isSuccess) {
      setEmployees(data);
    }
  }, [isSuccess]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput style={{ flex: 1 }} placeholder="Search" />

          {employees.length > 0 && (
            <View>
              <Pressable onPress={() => router.push("/(home)/addDetails")}>
                <AntDesign name="pluscircle" size={30} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      
    </View>
  );
};

export default employees;
