import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "../pages/api/trpc/[trpc]";

const t = initTRPC.context<Context>().create();

export const router = t.router;
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use((opts) => {
    // @ts-ignore
    if (!opts.ctx.user)
        throw new TRPCError({
            code: "UNAUTHORIZED",
        });

    return opts.next();
});
export const adminProcedure = protectedProcedure.use((opts) => {
    // @ts-ignore
    if (!["admin", "owner"].includes(opts.ctx.user?.role)) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
        });
    }

    return opts.next();
});

export const ownerProcedure = protectedProcedure.use((opts) => {
    // @ts-ignore
    if (!opts.ctx.user?.role !== "owner")
        throw new TRPCError({
            code: "UNAUTHORIZED",
        });

    return opts.next();
});
