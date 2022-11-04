import { Center, Text } from "native-base"

import Logo from "../../assets/logo.svg"

export function SignIn() {
    return (
        <Center bgColor="gray.900" flex={1}>
            <Logo />
            {/* <Text color="white" fontSize={24} fontFamily="heading">
                Sign in
            </Text> */}
        </Center>
    )
}
