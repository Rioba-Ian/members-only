interface user {
 id: number;
 firstName: string;
 lastName: string | null;
 email: string;
 kindeId: string | null;
 role: "user" | "admin" | "member" | null;
}

export type Post = {
 body: string;
 title: string;
 id: number;
 userId: number | null;
 createdAt: Date | null;
 updatedAt: Date | null;
 user?: user | null;
};
