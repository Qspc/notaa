import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faUserCheck } from "@fortawesome/free-solid-svg-icons";

export default function BottomBar() {
    return (
        <View className="flex flex-row items-center justify-between w-full px-10 bg-blue-200 min-h-8">
            {[1, 2, 3].map((i) => (
                <Text className="py-3" key={i}>
                    Icon {i}
                </Text>
            ))}
        </View>
    );
}
