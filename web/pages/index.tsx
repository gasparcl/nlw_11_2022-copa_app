interface HomeProps {
    count: number
}

export default function Home(props: HomeProps) {
    return (
        <>
            <h1>Contagem: </h1>
            <h2>{props.count}</h2>
        </>
    )
}

// Camada que roda do lado do servidor do next:
export const getServerSideProps = async () => {
    const response = await fetch("http://localhost:3333/pools/count")
    const data = await response.json()

    console.log(data)

    return {
        props: {
            count: data.count,
        },
    }
}
