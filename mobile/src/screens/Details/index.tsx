import { useEffect, useState } from "react"
import { Share } from "react-native"
import { useRoute } from "@react-navigation/native"
import { HStack, useToast, VStack } from "native-base"

import { api } from "../../services/api"

import { Header } from "../../components/Header"
import { Loading } from "../../components/Loading"
import { PollProps } from "../../components/PollCard"
import { PollHeader } from "../../components/PollHeader"
import { EmptyMyPollList } from "../../components/EmptyMyPollList"
import { Option } from "../../components/Option"
import { Guesses } from "../../components/Guesses"

interface RouteParams {
    id: string
}

export function Details() {
    // ╦ ╦╔═╗╔═╗╦╔═╔═╗
    // ╠═╣║ ║║ ║╠╩╗╚═╗
    // ╩ ╩╚═╝╚═╝╩ ╩╚═╝
    const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
        "guesses"
    )
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pollDetails, setPollDetails] = useState<PollProps>({} as PollProps)

    const toast = useToast()
    const route = useRoute()
    const { id } = route.params as RouteParams

    useEffect(() => {
        const fetchPollDetails = async () => {
            try {
                const response = await api.get(`/polls/${id}`)
                const pollDetailsData = response.data.poll
                // TEMP - TESTAR PARA VER SE RECEBEMOS TODOS OS DADOS DO BACKEND - /server/src/routes/poll.ts - EM POLL DETAILS
                setPollDetails(pollDetailsData)
            } catch (err) {
                console.log(err)

                toast.show({
                    title: "Não foi possível carregar os detalhes do bolão...",
                    placement: "top",
                    bgColor: "red.500",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchPollDetails()
    }, [id])

    // ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    // ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    // ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝
    const handleCodeShare = async () => {
        await Share.share({
            message: pollDetails.code,
        })
    }

    if (isLoading) return <Loading />

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={pollDetails.title}
                showBackButton
                showShareButton
                onShare={handleCodeShare}
            />
            {pollDetails._count?.participants > 0 ? (
                <VStack px={5} flex={1}>
                    <PollHeader data={pollDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option
                            title="Seus palpites"
                            isSelected={optionSelected === "guesses"}
                            onPress={() => setOptionSelected("guesses")}
                        />
                        <Option
                            title="Ranking do grupo"
                            isSelected={optionSelected === "ranking"}
                            onPress={() => setOptionSelected("ranking")}
                        />
                    </HStack>

                    <Guesses pollId={pollDetails.id} code={pollDetails.code} />
                </VStack>
            ) : (
                <EmptyMyPollList code={pollDetails.code} />
            )}
        </VStack>
    )
}
