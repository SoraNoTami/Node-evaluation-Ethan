# Evaluation

## Créer le CRUD d’un blog

Vous devrez avoir plusieurs tables dans votre base de données: 

- `User` Utilisateur
- `Post` Un article
- `Comment` Un commentaire d’un article

Un `User`  a plusiers `Post` et plusieurs `Comment`

Un `Comment` appartient seulement à un `Post`

Vous devriez être capable de vous connecter, vous inscrire et voir des `Posts` seulement si vous êtes connecté (en gros seulement si vous avez un token valide).  

Seul les auteur d’un `Post` ont la possibilité de modifier un article.  

On dois pouvoir trier les `Post` par date via un query param.

Par exemple je dois pouvoir faire:

```tsx
GET /api/posts?from=1674560065
```

Où le param `from`  est un timestamp. Utilisez prisma pour effectuer le filtre.

Seul les auteurs des `Comment` ont la possibilité de modifier un commentaire

Validez vos requêtes avec `express-validator`

Vous devez faire un CRUD (Create, Read, Update, Delete) pour les ressouces suivantes:

- `User`
    - seul un `User` ayant le role `admin` doit pouvoir être capable de supprimer un autre `User`
    - la valeur du rôle est définie à `user` par défaut
- `Comment`
    - seul l’auteur du `Comment` peut le modifier ou le supprimer
    - un `admin` doit pouvoir supprimer un `Comment`
- `Post` : seul l’auteur du `Post` peut le modifier ou le supprimer
    - Un admin doit pouvoir supprimer un `Post`

Lorsque je récupère un `Post` je dois pouvoir récupérer les `Comment` associés dans la même requête.

Déployez votre application.