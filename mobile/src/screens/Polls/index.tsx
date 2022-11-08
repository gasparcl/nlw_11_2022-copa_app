import { useCallback, useState } from "react"
import { VStack, Icon, useToast, FlatList } from "native-base"
import { Octicons } from "@expo/vector-icons"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import { api } from "../../services/api"

import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { PollCard, PollProps } from "../../components/PollCard"
import { Loading } from "../../components/Loading"
import { EmptyPollList } from "../../components/EmptyPollList"

export function Polls() {
    // ╦ ╦╔═╗╔═╗╦╔═╔═╗
    // ╠═╣║ ║║ ║╠╩╗╚═╗
    // ╩ ╩╚═╝╚═╝╩ ╩╚═╝
    const [isLoading, setIsLoading] = useState(true)
    const [polls, setPolls] = useState<PollProps[]>([])

    const { navigate } = useNavigation()
    const toast = useToast()

    // TEMP - TESTAR PARA VER SE FUNCIONA APENAS UTILIZANDO O USE EFFECT COM O ESTADO DE POLLS COMO DEPENDENCIA ****
    useFocusEffect(
        useCallback(() => {
            const fetchPolls = async () => {
                try {
                    const response = await api.get("/polls")
                    const pollsData = response.data.polls

                    setPolls(pollsData)
                } catch (err) {
                    console.log(err)

                    toast.show({
                        title: "Não foi possível carregar os bolões...",
                        bgColor: "red.500",
                        placement: "top",
                    })
                } finally {
                    setIsLoading(false)
                }
            }

            fetchPolls()
        }, [polls])
    )

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />

            <VStack
                mt={6}
                mx={5}
                borderBottomWidth={1}
                borderBottomColor="gray.600"
                pb={4}
                mb={4}
            >
                <Button
                    leftIcon={
                        <Icon
                            as={Octicons}
                            name="search"
                            color="black"
                            size="md"
                        />
                    }
                    title="Buscar bolão por código"
                    onPress={() => navigate("findPolls")}
                />
            </VStack>

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={polls}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                    px={5}
                    renderItem={({ item }) => (
                        <PollCard
                            data={item}
                            onPress={() => navigate("details", { id: item.id })}
                        />
                    )}
                    ListEmptyComponent={() => <EmptyPollList />}
                />
            )}
        </VStack>
    )
}
