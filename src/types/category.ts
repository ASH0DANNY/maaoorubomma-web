export interface Category {
    id: string;
    title: string;
    name: string;
    path: string;
    subCategories?: Category[];
}

export const categories: Category[] = [
    {
        id: '1',
        title: "Decor",
        name: 'Home Decor',
        path: '/category/home-decor',
        subCategories: [
            { id: '1-1', name: 'Wall Art', title: 'Wall Art', path: '/category/home-decor/wall-art' },
            { id: '1-2', name: 'Lanterns', title: 'Lanterns', path: '/category/home-decor/lanterns' },
            { id: '1-3', name: 'Brass Figurines', title: 'Brass Figurines', path: '/category/home-decor/brass-figurines' },
            { id: '1-4', name: 'Paintings', title: 'Paintings', path: '/category/home-decor/paintings' },
        ],
    },
    {
        id: '2',
        name: 'Event Decor & Return Gifts',
        title: 'Event Decor',
        path: '/category/event-decor-return-gifts',
        subCategories: [
            { id: '2-1', name: 'Solawood Decor', title: 'Solawood Decor', path: '/category/event-decor-return-gifts/solawood-decor' },
            { id: '2-2', name: 'Fabric Decor Pieces', title: 'Fabric Decor', path: '/category/event-decor-return-gifts/fabric-decor-pieces' },
        ],
    },
    {
        id: '3',
        name: 'Home & Living',
        title: 'Home & Living',
        path: '/category/home-living',
        subCategories: [
            { id: '3-1', name: 'Functional Items', title: 'Functional Items', path: '/category/home-living/functional-items' },
            { id: '3-2', name: 'Everyday Use Items', title: 'Everyday Items', path: '/category/home-living/everyday-use-items' },
        ],
    },
    {
        id: '4',
        name: 'Vintage Board Games',
        title: 'Board Games',
        path: '/category/vintage-board-games',
        subCategories: [
            { id: '4-1', name: 'Backgammon', title: 'Backgammon', path: '/category/vintage-board-games/backgammon' },
            { id: '4-2', name: 'Carrom Board', title: 'Carrom', path: '/category/vintage-board-games/carrom-board' },
            { id: '4-3', name: 'Checkers', title: 'Checkers', path: '/category/vintage-board-games/checkers' },
            { id: '4-4', name: 'Dice', title: 'Dice', path: '/category/vintage-board-games/dice' },
            { id: '4-5', name: 'Ludo', title: 'Ludo', path: '/category/vintage-board-games/ludo' },
            { id: '4-6', name: 'Marble Solitaire', title: 'Marble Solitaire', path: '/category/vintage-board-games/marble-solitaire' },
            { id: '4-7', name: 'Maze', title: 'Maze', path: '/category/vintage-board-games/maze' },
            { id: '4-8', name: 'Puzzles', title: 'Puzzles', path: '/category/vintage-board-games/puzzles' },
            { id: '4-9', name: 'Tic Tac Toe', title: 'Tic Tac Toe', path: '/category/vintage-board-games/tic-tac-toe' },
            {
                id: '4-10',
                name: 'Chess',
                title: 'Chess',
                path: '/category/vintage-board-games/chess',
                subCategories: [
                    { id: '4-10-1', name: 'Chess Board', title: 'Chess Board', path: '/category/vintage-board-games/chess/chess-board' },
                    { id: '4-10-2', name: 'Chess Pieces', title: 'Chess Pieces', path: '/category/vintage-board-games/chess/chess-pieces' },
                    { id: '4-10-3', name: 'Chess Set', title: 'Chess Set', path: '/category/vintage-board-games/chess/chess-set' },
                    { id: '4-10-4', name: 'Travel Chess Set', title: 'Travel Chess', path: '/category/vintage-board-games/chess/travel-chess-set' },
                ],
            },
            { id: '4-11', name: 'Kids Toys', title: 'Kids Toys', path: '/category/vintage-board-games/kids-toys' },
            { id: '4-12', name: 'Travel Games', title: 'Travel Games', path: '/category/vintage-board-games/travel-games' },
        ],
    },
    {
        id: '5',
        name: 'Indian Artforms',
        title: 'Indian Art',
        path: '/category/indian-artforms',
        subCategories: [
            { id: '5-1', name: 'Kolam', title: 'Kolam', path: '/category/indian-artforms/kolam' },
            { id: '5-2', name: 'Kondapalli Toys', title: 'Kondapalli', path: '/category/indian-artforms/kondapalli-toys' },
            { id: '5-3', name: 'Warli', title: 'Warli', path: '/category/indian-artforms/warli' },
            { id: '5-4', name: 'Madhubani', title: 'Madhubani', path: '/category/indian-artforms/madhubani' },
            { id: '5-5', name: 'Kerala Mural Painting', title: 'Kerala Mural', path: '/category/indian-artforms/kerala-mural-painting' },
            { id: '5-6', name: 'Pattachitra Painting', title: 'Pattachitra', path: '/category/indian-artforms/pattachitra-painting' },
            { id: '5-7', name: 'Kalamkari Painting', title: 'Kalamkari', path: '/category/indian-artforms/kalamkari-painting' },
            { id: '5-8', name: 'Tanjore Paintings', title: 'Tanjore', path: '/category/indian-artforms/tanjore-paintings' },
        ],
    },
    {
        id: '6',
        name: 'Pooja Items',
        title: 'Pooja Items',
        path: '/category/pooja-items',
        subCategories: [
            { id: '6-1', name: 'Brass Akhand Diya', title: 'Akhand Diya', path: '/category/pooja-items/brass-akhand-diya' },
            { id: '6-2', name: 'Oil-lamp Deepak', title: 'Deepak', path: '/category/pooja-items/oil-lamp-deepak' },
        ],
    },
    {
        id: '7',
        name: 'Chilli Powders',
        title: 'Chilli',
        path: '/category/chilli-powders',
    },
    {
        id: '8',
        name: 'Clearance',
        title: 'Clearance',
        path: '/category/clearance',
    },
    {
        id: '9',
        name: 'Blog',
        title: 'Blog',
        path: '/category/blog',
        subCategories: [
            { id: '9-1', name: 'Brass', title: 'Brass', path: '/category/blog/brass' },
            { id: '9-2', name: 'Indian Crafts', title: 'Indian Crafts', path: '/category/blog/indian-crafts' },
            { id: '9-3', name: 'Indian Culture', title: 'Indian Culture', path: '/category/blog/indian-culture' },
            { id: '9-4', name: 'Product Care Guide', title: 'Care Guide', path: '/category/blog/product-care-guide' },
        ],
    },
];
