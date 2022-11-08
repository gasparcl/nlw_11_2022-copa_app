import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Heading, useToast, VStack } from "native-base"

import { api } from "../../services/api"

import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"

export function FindPoll() {
    // ╦ ╦╔═╗╔═╗╦╔═╔═╗
    // ╠═╣║ ║║ ║╠╩╗╚═╗
    // ╩ ╩╚═╝╚═╝╩ ╩╚═╝
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [code, setCode] = useState<string>("")

    const { navigate } = useNavigation()
    const toast = useToast()

    // ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    // ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    // ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝
    const handleJoinPoll = async () => {
        try {
            setIsLoading(true)

            if (!code.trim()) {
                return toast.show({
                    title: "Informe o código do bolão...",
                    placement: "top",
                    bgColor: "red.500",
                })
            }

            await api.post("/polls/join", { code })

            toast.show({
                title: "Você entrou no bolão com sucesso...",
                placement: "top",
                bgColor: "green.500",
            })

            navigate("polls")
        } catch (err: any) {
            console.log(err)
            setIsLoading(false)

            if (err.response?.data?.message) {
                toast.show({
                    title: err.response.data.message,
                    placement: "top",
                    bgColor: "red.500",
                })
            } else {
                toast.show({
                    title: "Não foi possível encontrar o bolão...",
                    placement: "top",
                    bgColor: "red.500",
                })
            }
        }
    }

    return (
        <VStack flex={1} bg="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading
                    fontFamily="heading"
                    color="white"
                    fontSize="xl"
                    mb={8}
                    textAlign="center"
                >
                    Encontre um bolão através de {"\n"} seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    value={code}
                    onChangeText={setCode}
                />

                <Button
                    title="Buscar bolão"
                    isLoading={isLoading}
                    onPress={handleJoinPoll}
                />
            </VStack>
        </VStack>
    )
}
