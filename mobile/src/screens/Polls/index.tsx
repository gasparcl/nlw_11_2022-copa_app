import { useEffect, useState } from "react"
import { VStack, Icon, useToast, FlatList } from "native-base"
import { Octicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

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

    useEffect(() => {
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
    }, [])

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
                    renderItem={({ item }) => <PollCard data={item} />}
                    px={5}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                    ListEmptyComponent={() => <EmptyPollList />}
                />
            )}
        </VStack>
    )
}
