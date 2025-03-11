import { createDirectus, rest } from "@directus/sdk";
import { useMemo } from "react";
import { GLOBAL, Schema } from "./publicEnums";

export function useClient() {
	const client = useMemo(() => {
		return createDirectus<Schema>(GLOBAL.DIRECTUS_API).with(rest());
	}, [])

	return {
		client: client
	}
}