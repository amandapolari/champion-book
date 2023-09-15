import express, { Request, Response } from 'express';
import cors from 'cors';
import { champions } from './database';
import { DIFFICULTY, TChampion } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
});

app.get('/test', (req: Request, res: Response) => {
    res.send('Funcionando!');
});

// console.table(champions);

// getAllChampions
// app.get('/champions', (req: Request, res: Response) => {
//     const result: TChampion[] = champions;
//     res.status(200).send(result);
// });

// getChampionsByName
app.get('/champions', (req: Request, res: Response) => {
    const query: string = req.query.q as string;
    // console.log(query);
    if (query !== undefined) {
        const championsByName: TChampion[] = champions.filter((champion) =>
            champion.name.toLowerCase().includes(query.toLowerCase())
        );
        if (championsByName.length <= 0) {
            res.status(404).send('Nenhum produto encontrado');
        } else {
            res.status(200).send(championsByName);
        }
    } else {
        res.status(200).send(champions);
    }
});

// createChampion
app.post('/champions', (req: Request, res: Response) => {
    const { id, name, img, attack, defense, magic, difficulty }: TChampion =
        req.body;
    const newChamp: TChampion = {
        id,
        name,
        img,
        attack,
        defense,
        magic,
        difficulty,
    };
    champions.push(newChamp);
    res.status(201).send('Cadastro realizado com sucesso');
});

// deleteChampById
app.delete('/champions/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const indexToDelete = champions.findIndex(
        (champion) => champion.id === Number(id)
    );
    if (indexToDelete >= 0) {
        champions.splice(indexToDelete, 1);
    } else {
        console.log(`O id ${id} não existe`);
    }
    res.status(200).send({
        message: `Campeão apagado com sucesso`,
    });
});

// editChampionById
app.put('/champions/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const newId = req.body.id as number | undefined;
    const newName = req.body.name as string | undefined;
    const newImg = req.body.img as string | undefined;
    const newAttack = req.body.attack as number | undefined;
    const newDefense = req.body.defense as number | undefined;
    const newMagic = req.body.magic as number | undefined;
    const newDifficulty = req.body.difficulty as DIFFICULTY | undefined;
    const champion = champions.find((champion) => champion.id === Number(id));

    if (champion) {
        champion.id = newId || Number(champion.id);
        champion.name = newName || champion.name;
        champion.img = newImg || champion.img;
        champion.attack = newAttack || champion.attack;
        champion.defense = newDefense || champion.defense;
        champion.magic = newMagic || champion.magic;
        champion.difficulty = newDifficulty || champion.difficulty;
    }

    res.status(200).send({ message: 'Atualização realizada com sucesso' });
});
