DROP TRIGGER IF EXISTS trg_set_meta_hash ON pulsar.meta;

CREATE TRIGGER trg_set_meta_hash
    BEFORE INSERT OR UPDATE OF configurations ON pulsar.meta
    FOR EACH ROW
    EXECUTE FUNCTION pulsar.set_meta_hash_trigger();