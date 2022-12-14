import { useEffect, useState } from "react"
import { FlatList, useToast } from "native-base"

import { api } from "../services/api"
import { Game, GameProps } from "./Game"
import { Loading } from "./Loading"
import { EmptyMyPollList } from "./EmptyMyPollList"

interface Props {
    pollId: string
    code: string
}

export function Guesses({ pollId, code }: Props) {
    // ╦ ╦╔═╗╔═╗╦╔═╔═╗
    // ╠═╣║ ║║ ║╠╩╗╚═╗
    // ╩ ╩╚═╝╚═╝╩ ╩╚═╝
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [games, setGames] = useState<GameProps[]>([])
    const [firstTeamPoints, setFirstTeamPoints] = useState("")
    const [secondTeamPoints, setSecondTeamPoints] = useState("")

    const toast = useToast()

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setIsLoading(true)

                const response = await api.get(`/polls/${pollId}/games`)
                const gamesData = response.data.games

                setGames(gamesData)
            } catch (err) {
                console.log(err)

                toast.show({
                    title: "Não foi possível carregar seus palpites...",
                    placement: "top",
                    bgColor: "red.500",
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchGames()
    }, [pollId, games])

    // ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    // ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    // ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝
    const handleGuessConfirm = async (gameId: string) => {
        try {
            if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
                return toast.show({
                    title: "Informe o placar do palpite...",
                    placement: "top",
                    bgColor: "red.500",
                })
            }

            await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints),
            })

            toast.show({
                title: "Palpite enviado com sucesso...",
                placement: "top",
                bgColor: "green.500",
            })
        } catch (err) {
            console.log(err)

            toast.show({
                title: "Não foi possível enviar o palpite...",
                placement: "top",
                bgColor: "red.500",
            })
        }
    }

    if (isLoading) return <Loading />

    return (
        <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Game
                    data={item}
                    setFirstTeamPoints={setFirstTeamPoints}
                    setSecondTeamPoints={setSecondTeamPoints}
                    onGuessConfirm={() => handleGuessConfirm(item.id)}
                />
            )}
            _contentContainerStyle={{ pb: 10 }}
            ListEmptyComponent={() => <EmptyMyPollList code={code} />}
        />
    )
}
